using System.Collections.Generic;
using System.Web.Optimization;

namespace SiteSemUmbraco
{
    public class AsIsBundleOrderer : IBundleOrderer
    {
        public IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
        {
            return files;
        }
    }
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Layout/Css")
                .Include("~/Content/css/font-awesome.min.css", new CssRewriteUrlTransform())
                .Include("~/Content/css/flaticon.css", new CssRewriteUrlTransform())
                .Include("~/Content/css/bootstrap.min.css", new CssRewriteUrlTransform())
                .Include("~/Content/css/animate.css", new CssRewriteUrlTransform())
                .Include("~/Content/css/owl.carousel.css", new CssRewriteUrlTransform())
                .Include("~/Content/css/owl.theme.css", new CssRewriteUrlTransform())
                .Include("~/Content/css/owl.transitions.css", new CssRewriteUrlTransform())
                .Include("~/Content/css/jquery.fancybox.min.css", new CssRewriteUrlTransform())
                .Include("~/Content/css/pnotify.custom.min.css", new CssRewriteUrlTransform())
                .Include("~/Content/css/style.css", new CssRewriteUrlTransform()));

            var bundle = new ScriptBundle("~/bundles/scripts");
            bundle.Orderer = new AsIsBundleOrderer();
            bundle
                .Include("~/Content/js/bootstrap.min.js")
                .Include("~/Content/js/jquery-plugin-collection.js")
                .Include("~/Content/js/jquery.countdown-pt-BR.js")
                .Include("~/Content/js/script.js");
            bundles.Add(bundle);

            bundles.Add(new ScriptBundle("~/bundles/firebase").Include("~/Scripts/InitFirebase.js"));

        }
    }
}
