var builder = WebApplication.CreateSlimBuilder(args);
var app = builder.Build();

// https://khalidabuhakmeh.com/running-vite-with-aspnet-core-web-applications

app.MapGet("/", () => "Hello World!");

app.MapGet("/html-lib", () =>
{
    const string html = """
                        <script>alert('xss')</script><div onload="alert('xss')"
                        """
                        + """
                          style="background-color: rgba(0, 0, 0, 1)">Test<img src="test.png"
                          """
                        + """style="background-image: url(javascript:alert('xss')); margin: 10px"></div>""";
    
    var sanitized = Application.HtmlUtils.CleanHtml(html);
    return sanitized;
});

app.Run();
