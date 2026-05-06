import nav
import pages
import theme

def main() -> int:
    print(theme.Initializer())
    print(nav.Initializer())
    print(pages.Initializer())
    # print(pages.ModularContent())
    return 0

if __name__ == "__main__":
    main()