let segundo = 0;
let minuto = 0;
self.setInterval(() => {
    self.postMessage(segundo++);
}, 1000);
