import nodemailer from 'nodemailer';
export const sendEmails = async (req, res) => {
  const { 
    ownerEmail, 
    studentEmail, 
    title,
    StudentName,
    PaidAmount,
    OwnerContact,
    OwnerName,
    StudetMobile,
    Start,
    End,
     
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: ownerEmail,
    subject: 'New Booking Confirmation',
    text:
    `Dear ${OwnerName},

We are pleased to inform you that a new booking has been made at your boarding house,
in ${StudentName}. Here are the details of the booking,

Guest Name: ${StudentName}
Time Period Start: ${Start}
Time Period End: ${End}
Total Amount: LKR ${PaidAmount}
Contact Number: ${StudetMobile}
Please ensure that the room is prepared for the Student's arrival. 
If you have any questions or need further assistance,
feel free to reach out to us at uniboard.info@gmail.com.

Thank you for being a part of our booking system!

Best regards,

UniBoard.Lk
uniboard.info@gmail.com`,

  };
  const studentMailOptions = {
    from: process.env.EMAIL_USER,
    to: studentEmail,
    subject: 'Booking Confirmation',
    text:
    `Dear, ${StudentName},

Thank you for using our "UniBoardLk" Online boarding booking system!
We are excited to confirm your reservation at "${title}".
Here are the details of your booking,

Time Period Start: ${Start}
Time Period End: ${End}
Total Amount: LKR ${PaidAmount}
Owner's Occupation : ${OwnerName}
Owner Contact Number: ${OwnerContact}
If you have any questions or need assistance,
please do not hesitate to reach out to our support team.

We wish you a pleasant stay!

Best regards,

UniBoard.Lk
uniboard.info@gmail.com`,
  };

  try {
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(studentMailOptions);
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Error sending emails' });
  }
};




export const RequestEmails = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email, 
    to: process.env.EMAIL_USER, 
    subject: 'New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Error sending emails' });
  }
};
