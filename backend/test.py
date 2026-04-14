def printGreet(name: str) -> None:
    print("Hello" + " " + name)


dd = {"name": "Manoj"}

printGreet(**dd)
