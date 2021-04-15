/**
 * App.LoadCSS.js
 * @directory App/Components
 * @build 2021.01.05
 * (C) 2020 Wilfredo Pacheco
 */

export default function LoadCSS(cssArray){
    const head = document.querySelector('head');

    const createLinkElement = href => {
        const linkElement = document.createElement('link');

        linkElement.setAttribute('rel', 'stylesheet')
        linkElement.setAttribute('href', href)

        return linkElement;
    }

    cssArray.forEach(file => head.prepend(createLinkElement(file)))
}