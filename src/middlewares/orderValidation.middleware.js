import joi from "joi";

function orderValidation(req, res, next) {

  const schema = joi.object({
    email: joi.string().email().required(),
    name: joi.string().required(),
    address: joi.string().required(),
    payment: joi.object({
        paymentName: joi.string().required(),
        creditCardNumber: joi.number().required(),
    }).required(),
    order: joi.array().required(),
  });

  const { email, name, address, payment, order } = req.body;

  const validation = schema.validate(
    { email, name, address, payment, order },
    { abortEarly: false }
  );

  if (validation.error) {
    res.status(422).send(validation.error);
    return;
  }
  next();
}

export { orderValidation };