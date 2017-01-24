import 'babel-polyfill';
import PP from './lib';

window.addEventListener('load', () => {
    let myLabel = new PP.Ui.Label({
        ParentNode: document.body,
        Content: 'myLabel',
        Events: [{
            name: 'Click',
            listeners: [console.log.bind(console, 'click!')]
        }]
    });

    let p = new Promise((resolve) => {
        setTimeout(resolve.bind(this, 'Promises are working!'), 1000);
    });

    p.then(res => alert(res));

    myLabel.on('Click', () => {myLabel.Content = 'Hello World!';} );
});