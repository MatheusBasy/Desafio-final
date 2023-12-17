const nodemailer = require("nodemailer");

const transportador = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port:465 ,
  auth: {
    user: "apikey",
    pass: "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"
  },
});

const enviarEmail = (destinatario) => {
  transportador.sendMail({
    from: "Niethz.s20@gmail.com",
    to: destinatario,
    subject: "Pedido finalizado",
    text: "O pedido feito no site foi concluido com sucesso",
  });
};

module.exports = enviarEmail;