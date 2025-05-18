export const generatePickupRequestTemplate = ({
  studentName,
  studentGrade,
  studentClass,
  parentName,
  location,
}: {
  studentName: string;
  studentGrade: string;
  studentClass: string;
  parentName: string;
  location: string;
}) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pickup Request Notification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; background-color: #f0f4f8;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
        <!-- Header with gradient -->
        <tr>
          <td style="background: linear-gradient(135deg, #1a365d 0%, #2563eb 100%); padding: 32px 24px; border-radius: 16px 16px 0 0;">
            <img src="https://fs001.classter.com/londonacademy/8537/4/2024/9/Photo/thumbnail-logo-elite-copy-ab093918-86d9-4f71-99e7-170f3773aafa.png" alt="London Academy" style="width: 140px; height: auto; margin-bottom: 24px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Pickup Request Confirmation</h1>
          </td>
        </tr>

        <!-- Main Content -->
        <tr>
          <td style="background-color: #ffffff; padding: 32px 24px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Student Card -->
            <div style="background: linear-gradient(to right, #f0f9ff, #e0f2fe); border-radius: 12px; padding: 24px; margin-bottom: 32px; border: 1px solid #bfdbfe;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h2 style="color: #1e40af; margin: 0 0 8px 0; font-size: 24px; font-weight: 600;">${studentName}</h2>
                    <div style="display: inline-block; background-color: #ffffff; padding: 8px 16px; border-radius: 20px; margin: 8px 0;">
                      <p style="color: #1e40af; margin: 0; font-size: 16px; font-weight: 500;">Grade ${studentGrade}
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Pickup Details -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
              <tr>
                <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
                  <p style="color: #6b7280; margin: 0 0 4px 0; font-size: 14px;">Parent/Guardian</p>
                  <p style="color: #111827; margin: 0; font-size: 16px; font-weight: 500;">${parentName}</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
                  <p style="color: #6b7280; margin: 0 0 4px 0; font-size: 14px;">Pickup Location</p>
                  <p style="color: #111827; margin: 0; font-size: 16px; font-weight: 500;">London Academy Casablanca</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px 0;">
                  <p style="color: #6b7280; margin: 0 0 4px 0; font-size: 14px;">Request Time</p>
                  <p style="color: #111827; margin: 0; font-size: 16px; font-weight: 500;">${new Date().toLocaleString()}</p>
                </td>
              </tr>
            </table>

            <!-- Information Box -->
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 32px; border-left: 4px solid #3b82f6;">
              <p style="color: #1e40af; margin: 0; font-size: 15px; line-height: 1.6;">
                We have received your request. Our staff will take care of the pickup process.
              </p>
            </div>

            <!-- Footer -->
            <p style="color: #6b7280; font-size: 14px; margin: 0; text-align: center; padding-top: 24px; border-top: 1px solid #e5e7eb;">
              This is an automated message from London Academy. Please do not reply to this email.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
