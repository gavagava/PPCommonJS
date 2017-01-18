import PP from './lib';

window.addEventListener('load', () => {
    let s = {
        ParentNode: document.body,
        Content: 'myLabel',
        Events: [{
            name: 'Click',
            listeners: [console.log.bind(window, 'click!')]
        }]
    };

    let myLabel = new PP.Ui.Label(s);

    myLabel.on('Click', () => {myLabel.Content = 'Hello World!';} );
});