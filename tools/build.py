#!/usr/bin/env python3
"""Build the shareable single-file HTML versions of the RREAGA Painting site.

    python tools/build.py [site|board|preview|all] [--out DIR]

  site     dist/arreaga-painting-site.html          the website alone (CSS + images inlined), for sharing a file
  board    dist/arreaga-painting-design-board.html  the design board with the Design review panel
  preview  dist/arreaga-painting-preview.html       the board reduced to a simple Laptop / Mobile toggle
  pages    docs/index.html (+ docs/.nojekyll)       the same single-file website, in the folder GitHub Pages serves

All outputs are one self-contained file. The only outside request is Google Fonts.
The board files carry the site inside them and hand it to their two iframes through `srcdoc`.
"""
import base64, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rd = lambda f: open(os.path.join(ROOT, f), encoding='utf-8').read()


def build_site():
    """index.html with style.css and every assets/*.png inlined."""
    site = rd('index.html')
    link = '<link rel="stylesheet" href="style.css">'
    assert site.count(link) == 1, 'stylesheet link not found in index.html'
    site = site.replace(link, '<style>\n' + rd('style.css') + '\n</style>')
    site = re.sub(
        r'src="(assets/[^"]+\.png)"',
        lambda m: 'src="data:image/png;base64,' + base64.b64encode(open(os.path.join(ROOT, m.group(1)), 'rb').read()).decode() + '"',
        site)
    assert 'assets/' not in site and 'style.css' not in site
    return site


def site_blob(site):
    """The site as a JSON string that is safe to embed in a <script> (no raw '<')."""
    return json.dumps(site).replace('<', '\\u003c').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')


def embed_site(board_html, site):
    """Make a board page self-contained: its iframes get the site through srcdoc instead of src='index.html'."""
    b = board_html.replace('<iframe src="index.html" title="${k}"></iframe>', '<iframe title="${k}"></iframe>')
    b = b.replace("  world.append(el);\n", "  world.append(el);\n  el.querySelector('iframe').srcdoc=SITE;\n", 1)
    b = b.replace('<script>\nconst LBL=', '<script>\nconst SITE=' + site_blob(site) + ';\nconst LBL=', 1)
    assert 'const SITE=' in b and 'srcdoc=SITE' in b and 'src="index.html"' not in b
    return b


def build_board(site):
    b = rd('board.html')
    b = b.replace('<script src="changes.js"></script>', '<script>\n' + rd('changes.js') + '\n</script>')
    assert '<script src=' not in b
    return embed_site(b, site)


def build_preview(site):
    b = rd('board.html')
    # remove the Design review panel (markup + scripts)
    b, n = re.subn(r'<section id="panel">.*?</section>\n', '', b, flags=re.S)
    assert n == 1
    i = b.index('<script src="changes.js"></script>')
    j = b.index('</body>')
    b = b[:i] + b[j:]
    assert 'changes.js' not in b
    # simple Laptop / Mobile toggle only
    b = b.replace('<button data-m="desktop" class="on">Desktop</button>', '<button data-m="desktop" class="on">Laptop</button>')
    b = b.replace('    <button data-m="both">Both</button>\n', '')
    assert 'data-m="both"' not in b
    b = b.replace('<b>Arreaga Painting</b>', '<b>RREAGA Painting</b>', 1)
    b = b.replace('</style>', '#preset,#reset{display:none}\n</style>', 1)   # keep the elements (the script references them), hide them
    b = b.replace('<title>Arreaga Painting · Board</title>', '<title>RREAGA Painting · Website preview</title>')
    b = b.replace('<span>${k[0].toUpperCase()+k.slice(1)}</span>', '<span>${k==="desktop"?"Laptop":"Mobile"}</span>')
    return embed_site(b, site)


# name -> (folder under the output root, file name, builder)
TARGETS = {
    'site': ('dist', 'arreaga-painting-site.html', lambda site: site),
    'board': ('dist', 'arreaga-painting-design-board.html', build_board),
    'preview': ('dist', 'arreaga-painting-preview.html', build_preview),
    'pages': ('docs', 'index.html', lambda site: site),
}


def main(argv):
    out = ROOT
    if '--out' in argv:
        k = argv.index('--out')
        out = os.path.abspath(argv[k + 1])
        argv = argv[:k] + argv[k + 2:]
    which = argv[1] if len(argv) > 1 else 'all'
    names = list(TARGETS) if which == 'all' else [which]
    if any(n not in TARGETS for n in names):
        sys.exit(__doc__)
    site = build_site()
    for n in names:
        folder, fname, fn = TARGETS[n]
        os.makedirs(os.path.join(out, folder), exist_ok=True)
        dst = os.path.join(out, folder, fname)
        with open(dst, 'w', encoding='utf-8') as f:
            f.write(fn(site))
        if n == 'pages':   # GitHub Pages: serve the file as-is, skip Jekyll
            open(os.path.join(out, folder, '.nojekyll'), 'w').close()
        print('%-8s %s  (%d KB)' % (n, dst, round(os.path.getsize(dst) / 1024)))


if __name__ == '__main__':
    main(sys.argv)
