from dataclasses import dataclass, field
from pathlib import Path as root
from bs4 import BeautifulSoup


HTML = lambda t: BeautifulSoup(t, 'html.parser')
ROOT = root()
TEMPLATE_HTML_PATH = ROOT / "templates" / "nav.html"

@dataclass
class Initializer:
    navLinks:list[str] = field(init=False, default_factory=list)
    def __post_init__(self) -> None:
        self.navLinks = self.getCurrentLinks()
        self.updateNav(self.getUnlinkedPages())
    
    def getCurrentLinks(self) -> list:
        html = self.getHtml()
        return [str(a['href']).replace("/", "") for a in html.find_all('a', href=True)]
    
    def getUnlinkedPages(self) -> list:
        return [file.name for file in ROOT.iterdir() if file.is_file() and file.suffix == ".html" and str(file.name)[0:] not in self.navLinks]
    
    def updateNav(self, links) -> None:
        html = self.getHtml()
        nav = html.find('ol')
        for link in links:
            title = link.replace('.html', '').upper()
            txtTemplate = F"""
            <li>
                <a href="/{link}" title="{title}">
                    <span>
                    {title}
                    </span>
                </a>
            </li>
            |
            """
            if nav:
                nav.append(HTML(txtTemplate))
            self.navLinks.append(link)
            
        with open(TEMPLATE_HTML_PATH, 'w', encoding='utf-8') as file:
            file.write(html.prettify())
   
    def getHtml(self) -> BeautifulSoup:
        with open(TEMPLATE_HTML_PATH, 'r', encoding="utf-8") as template:
            return HTML(template.read())