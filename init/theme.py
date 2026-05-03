from dataclasses import dataclass, field
from PIL import Image

THEME_PATH:str = "assets/themes/theme.png"
CSS_PATH:str = "main.css"

# t in MAKE_ROOT is colors dict.
MAKE_ROOT = lambda t: F""" 
--primaryColor: {t['--primaryColor']};
--secondaryColor: {t['--secondaryColor']};
--textColor: white;
--primaryBackgroundColor: {t['--primaryBackgroundColor']};
--secondaryBackgrounColor: {t['--secondaryBackgroundColor']};
"""

@dataclass
class Initializer:
    colors:dict = field(init=False, default_factory=dict)
    root:str = field(init=False, default_factory=str)
    
    def __post_init__(self) -> None:
        self.colors = self.getColors()
        self.root = MAKE_ROOT(self.colors)
        self.updateCSS()
        
    def rgb_to_hex(self, rgb):
        return "#{:02x}{:02x}{:02x}".format(*rgb)
        
    def getColors(self) -> dict:
        theme:dict = dict()
        if (img := Image.open(THEME_PATH).convert('RGB')):
            w, h = img.size
            pix = img.load()
            if pix:
                theme = {
                    "--primaryColor":self.rgb_to_hex(pix[0, 0]),
                    "--secondaryColor":self.rgb_to_hex(pix[w-1, 0]),
                    "--primaryBackgroundColor":self.rgb_to_hex(pix[w-1,h-1]),
                    "--secondaryBackgroundColor":self.rgb_to_hex(pix[0,h-1]),
                }
        return theme
    
    def updateCSS(self) -> None:
        
        with open(CSS_PATH, 'r', encoding='utf-8') as file:
            css:str = file.read()
            
        for target, value in self.colors.items():
            start = css.find(target)
            if start == -1:
                continue
                
            end = css.find(";", start)
            if end == -1:
                continue
                
            css = str(css[:start] + F"{target}: {value}" + css[end:])
        
        with open(CSS_PATH, 'w', encoding='utf-8') as file:
            file.write(css)
            
if __name__ == "__main__":
    Initializer()