with open("personal/history.html", "r", encoding="utf-8") as f:
    text = f.read()

with open("history.html.bak", "r", encoding="utf-8") as f:
    bak = f.read()

start_marker_bak = '<div class="tabs_site profile_tabs__content">'
end_marker_bak = "\t_processform_Ar8Szp();\nelse\n\tBX.addCustomEvent('onAjaxSuccess', _processform_Ar8Szp);\n</script>"
block_bak = bak[bak.find(start_marker_bak) : bak.find(end_marker_bak) + len(end_marker_bak)]

start_marker_bad = '<script type="text/javascript">\n    $(document).ready(function(){\n        $(\'.sag_search_form\').submit(function(e){\n'
end_marker_bad = "\t_processform_Ar8Szp();\nelse\n\tBX.addCustomEvent('onAjaxSuccess', _processform_Ar8Szp);\n</script>"

start_idx = text.find(start_marker_bad)

if start_idx != -1:
    end_idx = text.find(end_marker_bad) + len(end_marker_bad)
    # The bad block
    bad_part = text[start_idx:end_idx]
    
    # We replace it with block_bak
    text = text.replace(bad_part, block_bak)
    
    with open("personal/history.html", "w", encoding="utf-8") as f:
        f.write(text)
    print("Fixed history.html")
else:
    print("Bad start marker not found")

