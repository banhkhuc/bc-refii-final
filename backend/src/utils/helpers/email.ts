import nodemailer from 'nodemailer';
import config from 'config';

const transporter = nodemailer.createTransport(config.mail_setting);

const sendRegisterEmail = (email: string, account: string, password: string) => {
	try {
		const mailOptions = {
			from: config.mail_setting.auth.user,
			to: email,
			subject: 'Account register',
			html: `
			<div
			  class="container"
			  style="max-width: 90%; margin: auto; padding-top: 20px"
			>
			  <h1>Welcome to BC-Refrigerator!</h1>
			  <p style="font-size: 1.5rem;">Account: ${account}<p>
			  <p style="font-size: 1.5rem;">Password: ${password}<p>
		 </div>
		  `
		};
		transporter.sendMail(mailOptions);
	} catch (error) {
		throw error;
	}
};

const sendForgotEmail = (email: string, otp: string) => {
	try {
		const mailOptions = {
			from: config.mail_setting.auth.user,
			to: email,
			subject: 'Verify your forgotten email',
			html: `
			<div
			  class="container"
			  style="max-width: 90%; margin: auto; padding-top: 20px"
			>
			  <h2>Welcome to the Introverts cinema!</h2>
			  <p style="margin-bottom: 30px;">Pleas enter the forgotten OTP to reset password</p>
			  <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
		 </div>
		  `
		};
		transporter.sendMail(mailOptions);
	} catch (error) {
		throw error;
	}
};

const sendResetEmail = (email: string, password: string) => {
	try {
		const mailOptions = {
			from: config.mail_setting.auth.user,
			to: email,
			subject: 'Account reset',
			html: `
			<div
			  class="container"
			  style="max-width: 90%; margin: auto; padding-top: 20px"
			>
			  <h2>Reset password: ${password}</h2>
		 </div>
		  `
		};
		transporter.sendMail(mailOptions);
	} catch (error) {
		throw error;
	}
};

export { sendRegisterEmail, sendForgotEmail, sendResetEmail };
