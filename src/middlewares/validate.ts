//@ts-nocheck
import httpStatus from 'http-status';
import Joi from 'joi';
import { ApiError } from '../utils/ApiError';

const validate =
  (...schemas) =>
  (req, res, next) => {
    const schema = schemas.reduce((carry, currentSchema) => {
      Object.keys(currentSchema).map((key) => {
        if (key in carry) {
          carry[key] = carry[key].concat(currentSchema[key]);
          return;
        }

        carry[key] = Joi.object().concat(currentSchema[key]);
      });

      return carry;
    }, {});
    const data = Object.keys(schema).reduce((acc, key) => {
      acc[key] = req[key];
      return acc;
    }, {});
    const { value, error } = Joi.compile(schema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(data);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export { validate };
