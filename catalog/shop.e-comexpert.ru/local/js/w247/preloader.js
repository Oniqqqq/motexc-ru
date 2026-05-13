var EcomexpertPreloader = {
    isRuning: false,
    isChecking: false,
    timeout: 1000,
    content: '<div class="w247-page-loader"><div class="w247-loader-inner"></div></div>',
    hIterval: null,
    show: function (container = 'body') {
        this.isRuning = true;
        this.isChecking = false;

        var preloaderContainer = document.querySelector(container);
        var preloader = preloaderContainer.querySelector('.w247-page-loader');
        if(!preloader) {
            preloader = document.createElement('template');
            preloader.innerHTML = this.content;
            preloader = preloader.content.firstChild;
            preloaderContainer.appendChild(preloader);
        }

        preloader.style.display = 'inline-block';

        this.hInterval = setInterval(function () {
            if(!this.isRuning) {
                if(this.isChecking) {
                    clearInterval(this.hInterval);
                    preloader.style.display = 'none';
                } else {
                    this.isChecking = true;
                }
            } else {
                this.isChecking = false;
            }
        }.bind(this), this.timeout);
    },
    hide: function (container = 'body') {
        this.isRuning = false;
    }
};

/*
BX.showWait = function (node) {
    EcomexpertPreloader.show();
}
BX.closeWait = function (node) {
    EcomexpertPreloader.hide();
}*/
