namespace Application;

public class HtmlUtils
{
    public static string CleanHtml(string html) => Simplify.Utils.Html.Sanitize(html);
}
