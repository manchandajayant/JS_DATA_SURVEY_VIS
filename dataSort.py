import json
import sys

input_file = open('DATA/state_of_js_2016_2020.json')
data = json.load(input_file)

'''
************************************
**********Calculate by tools********
************************************
'''
arrOfAllTools = []


def main(data):
    for i in data:
        if 'tools' in i:
            b = list(i['tools'].keys())
            arrOfKeys = b
            arrOfAllTools.append(i['tools'])


newObj = {}


def calculateNumbers(data):
    for x in data:
        for y, z in x.items():
            if y in newObj:
                newObj[y].append(z['experience'])
            else:
                newObj[y] = [z['experience']]


calculateFreq = {}


def calculateValuesForEachTool(data):
    for x, y in data.items():
        for z in y:
            if x not in calculateFreq:
                calculateFreq[x] = {z: 1}
            else:
                if z not in calculateFreq[x]:
                    calculateFreq[x][z] = 1
                else:
                    calculateFreq[x][z] += 1

def mainRun():
    main(data)
    calculateNumbers(arrOfAllTools)
    calculateValuesForEachTool(newObj)
    with open('SORTED_DATA/data_by_tools.json', 'w') as outfile:
        json.dump(calculateFreq, outfile)


'''
************************************
**********End***********************
************************************
'''


'''
************************************
**********Calculate experience******
************************************
'''

expArr = []


def getAllValues(data):
    for i in data:
        if 'years_of_experience' in i['user_info']:
            if i['user_info']['years_of_experience'] == 'range_less_than_1':
                s = i['user_info']['years_of_experience'].split('_')
                less_than_str = '> ' + str(s[3])
                expArr.append(less_than_str)
            elif i['user_info']['years_of_experience'] == 'range_more_than_20':
                s = i['user_info']['years_of_experience'].split('_')
                more_than_str = '< ' + str(s[3])
                expArr.append(more_than_str)
            else:
                s = i['user_info']['years_of_experience'].split('_')
                newStr = str(s[1]) + '-' + str(s[2])
                expArr.append(newStr)


getAllValues(data)

with open('SORTED_DATA/experience_range.json', 'w') as outfile:
    json.dump(expArr, outfile)

'''
************************************
**********Calculate experience******
************************************
'''