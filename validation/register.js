const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    /*
      if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to between 2 and 4 characters';
      }

      if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
      }

      if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
      }

      if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
      }

      if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
          errors.website = 'Not a valid URL';
        }
      }

      if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
          errors.youtube = 'Not a valid URL';
        }
      }

      if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
          errors.twitter = 'Not a valid URL';
        }
      }

      if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
          errors.facebook = 'Not a valid URL';
        }
      }

      if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
          errors.linkedin = 'Not a valid URL';
        }
      }

      if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
          errors.instagram = 'Not a valid URL';
        }
      }
      data.title = !isEmpty(data.title) ? data.title : '';
      data.company = !isEmpty(data.company) ? data.company : '';
      data.from = !isEmpty(data.from) ? data.from : '';

      if (Validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
      }

      if (Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
      }

      if (Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
      }*/


    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    /* if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
*/
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }
    /*
      if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
      }

      if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
      }

      data.school = !isEmpty(data.school) ? data.school : '';
      data.degree = !isEmpty(data.degree) ? data.degree : '';
      data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
      data.from = !isEmpty(data.from) ? data.from : '';

      if (Validator.isEmpty(data.school)) {
        errors.school = 'School field is required';
      }

      if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required';
      }

      if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of study field is required';
      }

      if (Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
      }
    */

    return {
        errors,
        isValid: isEmpty(errors)
    };
};