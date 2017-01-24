import 'babel-polyfill';
import PP from './lib';

window.addEventListener('load', () => {
    let s = {
        ParentNode: document.body,
        Content: 'myLabel',
        Events: [{
            name: 'Click',
            listeners: [console.log.bind(console, 'click!')]
        }]
    };

    let p = new Promise((resolve) => {
        setTimeout(resolve.bind(this, 'Promises is working!'), 1000);
    });

    p.then(res => alert(res));

    let myLabel = new PP.Ui.Label(s);

    myLabel.on('Click', () => {myLabel.Content = 'Hello World!';} );
});