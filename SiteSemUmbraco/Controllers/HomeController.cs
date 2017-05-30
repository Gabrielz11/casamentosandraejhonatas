using System.Web.Mvc;
using System.Net.Mail;


namespace SiteSemUmbraco.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Contact(string name, string email, string text, string subject)
        {
            MailMessage oMail = new MailMessage();
            System.Text.StringBuilder txtMsg = new System.Text.StringBuilder();
            oMail.To.Add(new MailAddress("casamentosandraejhonatas@gmail.com"));
            oMail.IsBodyHtml = true;
            oMail.ReplyToList.Add(email);
            oMail.Subject = name + " - via site do casamento " + subject;
            oMail.Body = string.Format("<p>{0}</p>", text) ;
            oMail.SubjectEncoding = System.Text.Encoding.GetEncoding(1252);
            oMail.BodyEncoding = System.Text.Encoding.GetEncoding(1252);

            SmtpClient smtp = new SmtpClient();
            smtp.Send(oMail);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult temp()
        {
            return View();
        }
    }
}