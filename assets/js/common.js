$(document).ready(function() {
    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    });
    $('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    });

    var progressBar = $('#progress');
    if (!progressBar.length) return;

    function syncNavbarOffset() {
        var navbarHeight = $('#navbar').outerHeight(true);
        $('body').css({ 'padding-top': navbarHeight });
        $('.progress-container').css({ 'padding-top': navbarHeight });
        progressBar.css({ 'top': navbarHeight });
    }

    syncNavbarOffset();
    var getMax = function() { return $(document).height() - $(window).height(); };
    var getValue = function() { return $(window).scrollTop(); };

    if ('max' in document.createElement('progress')) {
        progressBar.attr({ max: getMax(), value: getValue() });

        $(document).on('scroll', function() {
            progressBar.attr({ value: getValue() });
        });

        $(window).on('resize', function() {
            syncNavbarOffset();
            progressBar.attr({ max: getMax(), value: getValue() });
        });
    } else {
        var max = getMax();
        var setWidth = function() {
            var width = max > 0 ? (getValue() / max) * 100 : 0;
            progressBar.css({ width: width + '%' });
        };
        setWidth();
        $(document).on('scroll', setWidth);
        $(window).on('resize', function() {
            syncNavbarOffset();
            max = getMax();
            setWidth();
        });
    }
});
