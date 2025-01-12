const SibApiV3Sdk = require('@getbrevo/brevo')
import { env } from '~/config/environment'


let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
let apiKey = apiInstance.authentications['apiKey']
apiKey.apiKey = env.BREVO_API_KEY

const sendEmail = async (recipientEmail, customSubject, htmlContent) => {
    // Khơi tạo một cái sendSmtpEmail với những thông tin cần thiết
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

    // Tài khoản gửi mail: Lưu ý địa chỉ admin email phải là email đã được xác thực trên Brevo

    sendSmtpEmail.sender = {
        email: env.ADMIN_EMAIL_ADDRESS,
        name: env.ADMIN_EMAIL_NAME

    }

    // Những tài khoản nhận email

    sendSmtpEmail.to = [{ email: recipientEmail }]

    // Tiêu đề email

    sendSmtpEmail.subject = customSubject

    // Nội dung email

    sendSmtpEmail.htmlContent = htmlContent

    // Gọi hành động gửi mail

    return apiInstance.sendTransacEmail(sendSmtpEmail)

}

export const BrevoProvider = {
    sendEmail
}
