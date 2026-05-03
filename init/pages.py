from dataclasses import dataclass, field
from pathlib import Path as root

ROOT = root()
EXISTS = lambda x: x.exists()
SIZE = lambda x: x.stat().st_size
TEMPLATE_HTML_PATH = ROOT / "templates" / "base.html"

@dataclass
class Initializer:
    emptyPages:list = field(init=False, default_factory=list)
    
    def __post_init__(self) -> None:
        self.findemptyPages()
        self.updateEmptyPages()
        self.findemptyPages()
        
    def findemptyPages(self) -> None:
        self.emptyPages.clear()
        numOfEmpty:int = 0
        for file in ROOT.rglob("*.html"):
            if SIZE(file) == 0:
                self.emptyPages.append(file)
                numOfEmpty += 1
        if numOfEmpty == 0:
            self.emptyPages.clear()
                
    def updateEmptyPages(self) -> None:
        if EXISTS(TEMPLATE_HTML_PATH) and (template := TEMPLATE_HTML_PATH.read_text()):
            for file in self.emptyPages:
                finalPage = template.replace("TITLE_PLACEHOLDER", file.stem.replace("-", " ").capitalize())
                file.write_text(finalPage)
        else:
            raise FileNotFoundError("Template File Not Found.")
        
if __name__ == "__main__":
    Initializer()