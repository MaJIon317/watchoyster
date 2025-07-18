import { defineConfig } from 'vite'
// @ts-ignore
import tailwindcss from '@tailwindcss/vite'
import nunjucks from 'vite-plugin-nunjucks'

const pages = {
    'home.html': { title: 'Home Page' },
    'products.html': { title: 'List product Page' },
    'product.html': { title: 'Product Page' },
    'checkout.html': { title: 'Checkout' },
    'checkout-success.html': { title: 'Checkout Success' },
    'about.html': { title: 'About us' },
    'contact.html': { title: 'Contact' },
    'account.html': { title: 'Account' },
    'account-orders.html': { title: 'Account: Orders' },
    'account-setting.html': { title: 'Account: Setting' },
    '404.html': { title: 'Error Page' },

    'ui.html': { title: 'UI Components' },
}

export default defineConfig({
    base: '/watchoyster/',
    plugins: [
        nunjucks({
            variables: pages,
        }),
        tailwindcss(),
    ],
    root: 'src',
    define: {
        pages: pages,
    }
})




