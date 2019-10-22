exports.createPostValidator = (req, res, next) => {
	req.check("body", "Write a message").notEmpty();

	 const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.userSignupValidator = (req, res, next) => {
    // name is not null
    req.check("name", "Imię i nazwisko lub ksywa są wymagane").notEmpty();
    
    // email is not null, valid and normalized
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Niepoprawny email")
        .isLength({
            min: 4,
            max: 2000
        });
    
    // check for password
    req.check("password", "Hasło jest wymagane").notEmpty();
    req.check("password")
        .isLength({ min: 3 })
        .withMessage("Hasło musi zawierać przynajmniej 3 znaki");
        //.matches(/\d/)
        //.withMessage("Hasło musi zawierać cyfrę");
    
    // check for errors
    const errors = req.validationErrors();
    
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    
    // proceed to next middleware
    next();
};
