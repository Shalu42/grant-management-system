const EmailTemplates = {
    template1: {
        template: `<!doctypehtml><html lang="en"><meta charset="UTF-8"><meta content="width=device-width,initial-scale=1"name="viewport"><title>NGO Donation Receipt</title><style>body{font-family:Arial,sans-serif;margin:0;padding:0;line-height:1.6}.container{max-width:600px;margin:auto;padding:20px;border:1px solid #ccc;border-radius:5px}.greeting{font-size:18px;font-weight:700}.content{margin-top:20px}.signature{margin-top:40px;font-style:italic}</style><div class="container"><p class="greeting">Dear Concern,<div class="content"><p>We are pleased to inform you that a donation has been made to your NGO. Below are the details:<ul><li><strong>NGO Name:</strong> {name}<li><strong>Address:</strong> {address}<li></ul><p>We sincerely appreciate your efforts in making a positive impact in the community.</div><p class="signature">Best Regards,<br>NGO - Grant Making</div>`,
        preview: `<!doctypehtml><html lang="en"><meta charset="UTF-8"><meta content="width=device-width,initial-scale=1"name="viewport"><title>NGO Donation Receipt</title><style>body{font-family:Arial,sans-serif;margin:0;padding:0;line-height:1.6}.container{max-width:600px;margin:auto;padding:20px;border:1px solid #ccc;border-radius:5px}.greeting{font-size:18px;font-weight:700}.content{margin-top:20px}.signature{margin-top:40px;font-style:italic}</style><div class="container"><p class="greeting">Dear Concern,<div class="content"><p>We are pleased to inform you that a donation has been made to your NGO. Below are the details:<ul><li><strong>NGO Name:</strong> Child & Wellfare Funds<li><strong>Address:</strong> 110, park road, NY<li></ul><p>We sincerely appreciate your efforts in making a positive impact in the community.</div><p class="signature">Best Regards,<br>NGO - Grant Making</div>`
    },
    template2: {
        template: `Sending money to nonprofit '{name}' at address '{address}'.`,
        preview: `<div>Sending money to nonprofit 'NY Child Care' at address '110,Park Road, NY'.</div>`
    }
}

export default EmailTemplates;