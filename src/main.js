import Alpine from 'alpinejs'

import {
    computePosition,
    autoUpdate,
    offset,
    flip,
    shift
} from '@floating-ui/dom'

window.Alpine = Alpine

Alpine.data('remoteModal', () => ({
    visible: false,
    htmlContent: '',
    loading: false,

    init() {
        window.addEventListener('open-modal', e => {
            const { url } = e.detail;
            this.open(url);
        });
    },

    open(url) {
        this.visible = true;
        this.loading = true;
        this.htmlContent = '';

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error('Ошибка загрузки');
                return res.text();
            })
            .then(html => this.htmlContent = html)
            .catch(() => this.htmlContent = '<p class="text-red-600">Ошибка загрузки</p>')
            .finally(() => this.loading = false);
    },

    close() {
        this.visible = false;
        this.htmlContent = '';
    }
}))

Alpine.data('tooltip', () => ({
    reference: null,
    floating: null,
    cleanup: null,

    init() {
        this.reference = this.$refs.reference

        this.reference.addEventListener('mouseenter', this.show.bind(this))
        this.reference.addEventListener('mouseleave', this.hide.bind(this))
        this.reference.addEventListener('focus', this.show.bind(this))
        this.reference.addEventListener('blur', this.hide.bind(this))
    },

    show() {
        // Если уже есть тултип — не создаём
        if (this.floating) return

        // Создаём тултип
        const tooltipEl = document.createElement('div')
        tooltipEl.className =
            'absolute w-max max-w-xs bg-white rounded-md p-3 shadow-md flex flex-col gap-1'
        tooltipEl.innerHTML = this.reference.dataset.content
        tooltipEl.setAttribute('role', 'tooltip')
        tooltipEl.style.display = 'none'

        document.body.appendChild(tooltipEl)
        this.floating = tooltipEl

        this.cleanup = autoUpdate(this.reference, this.floating, async () => {
            const { x, y } = await computePosition(this.reference, this.floating, {
                placement: 'right',
                middleware: [offset(10), flip(), shift({ padding: 5 })],
            })

            Object.assign(this.floating.style, {
                left: `${x}px`,
                top: `${y}px`,
                display: 'block',
                position: 'absolute',
            })
        })
    },

    hide() {
        if (this.floating) {
            this.floating.remove()
            this.floating = null
        }

        this.cleanup?.()
        this.cleanup = null
    },
}))

Alpine.start()

function isMobile() {
    return window.innerWidth <= 768; // условие для мобильных
}

