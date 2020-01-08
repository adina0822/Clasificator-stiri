
def getData(pth):
    fl = open(pth,'r',encoding='UTF8')
    line = fl.readline()
    data = []
    while line:
        temp = []
        line_data = line.split(' ',1)
        line_in_words = line_data[1].split(' ')
        for word in line_in_words:
            temp.append(word.lower())
        data.append(temp)
        line = fl.readline()
    return data

def getLabels(pth):
    fl = open(pth,'r',encoding='UTF8')
    line = fl.readline()
    data = []
    while line:
        data.append(int(line[len(line)-2]))
        line = fl.readline()
    return data