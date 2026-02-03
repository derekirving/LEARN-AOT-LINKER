using Ganss.Xss;

namespace Simplify.Utils;

public static class Html
{
    public static string Sanitize(string input)
    {
        var sanitizer = new HtmlSanitizer();
        var sanitized = sanitizer.Sanitize(input, "https://www.example.com");
        return sanitized;
    }
}
