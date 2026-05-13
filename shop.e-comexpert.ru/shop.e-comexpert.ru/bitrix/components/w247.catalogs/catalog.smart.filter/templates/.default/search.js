(function () {
    $(function () {
        $(document).on('keyup', '.jstree_search_input', function (event) {
            let searchText = $(this).val().toLowerCase();
            if(searchText.length > 0) {
                $(this).closest('.bx-filter-block').find('.checkbox .bx-filter-param-text').each(function () {
                    let $link = $(this);
                    if ($link.text().toLowerCase().indexOf(searchText) === -1) {
                        $link.closest('.checkbox').addClass('hidden');
                    } else {
                        $link.closest('.checkbox').removeClass('hidden');
                    }
                });
            } else {
                $(this).closest('.bx-filter-block').find('.checkbox .bx-filter-param-text').each(function () {
                    let $link = $(this);
                    $link.closest('.checkbox').removeClass('hidden');
                });
            }
            $(this).closest('.bx-filter-block').removeAttr('style');
        });
    })
})();