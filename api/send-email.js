import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, description } = req.body;

    if (!process.env.RESEND_API_KEY) {
        return res.status(500).json({ error: 'Missing Resend API Key' });
    }

    try {
        const data = await resend.emails.send({
            from: 'Devansh Digital Studio <onboarding@resend.dev>',
            to: ['devansh.studio.work@gmail.com'], // Deliver to user's email
            subject: `New Project Inquiry from ${name}`,
            html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
      `,
            replyTo: email,
        });

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, error: 'Failed to send email' });
    }
}
