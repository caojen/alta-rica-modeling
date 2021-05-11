# -*- coding: utf-8 -*-
"""
Created on Tue May 11 18:00:45 2021

@author: Mortimer
"""

# -*- coding: utf-8 -*-
"""
Created on Mon May 10 18:31:02 2021

@author: Mortimer
"""
from xml.etree.ElementTree import ElementTree,Element
def read_xml(in_path):  
    '''''读取并解析xml文件 
       in_path: xml路径 
       return: ElementTree'''  
    tree = ElementTree()  
    #prese()解析xml文件
    tree.parse(in_path)  
    return tree  
  
def write_xml(tree, out_path):  
    '''''将xml文件写出 
       tree: xml树 
       out_path: 写出路径'''  
    tree.write(out_path, encoding="utf-8",xml_declaration=True)  

def if_match(node, kv_map):
    '''''判断某个节点是否包含所有传入参数属性 
       node: 节点 
       kv_map: 属性及属性值组成的map'''  
    for key in kv_map:  
        if node.get(key) != kv_map.get(key):  
            return False  
    return True  

def find_nodes(tree, path):
    '''''查找某个路径匹配的所有节点 
       tree: xml树 
       path: 节点路径'''  
    return tree.findall(path) 

def get_node_by_keyvalue(nodelist, kv_map):
    '''''根据属性及属性值定位符合的节点，返回节点 
       nodelist: 节点列表 
       kv_map: 匹配属性及属性值map'''  
    result_nodes = []  
    for node in nodelist:  
        if if_match(node, kv_map):  
            result_nodes.append(node)  
    return result_nodes 

    

def list2dic(key,nodes):
    fault_trees={}
    for one in nodes:
        if len(one)==1:
            fault_trees[one[0]] = []
    #print("fault_trees=\n",fault_trees)
    for one in nodes:
        if len(one)>1:
            if key=="":
                fault_trees[one[0]].append(one)
            else:
                fault_trees[key+"."+one[0]].append(one)
    if len(fault_trees)==0:
        return False
    return fault_trees

def output(fault_trees,first):
    for key,value in fault_trees.items():
        if first:
            #print("system --> "+key)
            if 'system' not in fault_tree_dic.keys():
                fault_tree_dic['system']=[]
            fault_tree_dic['system'].append(key)
        for one in value:
            if(len(one)>0):
                one.pop(0)
            if(len(one)==1):
                one[0]=key+"."+one[0]
                #print(key+" --> "+one[0])
                if key not in fault_tree_dic.keys():
                    fault_tree_dic[key]=[]
                fault_tree_dic[key].append(one[0])
        #print("value=\n",value)
        subtrees=list2dic(key,value)
        if(subtrees!=False):
            output(subtrees,False)
            #print("\nsubtrees=\n",subtrees)
        else:
            #print("substrees==False  此时key=",key,"  value=",value)
            continue

import sys

if __name__ == "__main__":  
      
    #1. 读取xml文件  
    #./表示当前目录，或者不用，直接当前目录下文件名
    filename = sys.argv[1]
    tree = read_xml(filename)
    #write_xml(tree, "./out.xml")
    #A. 找到父节点  
    nodes1 = find_nodes(tree, "define-gate")
    nodes2 = find_nodes(tree, "define-gate/gate")
    nodes3 = find_nodes(tree, "define-gate/and/gate")
    for one in nodes2:
        nodes1.append(one)
    for one in nodes3:
        nodes1.append(one) #nodes1是所有名称
    #print(len(nodes1))
    #数据清洗：target_nodes1存放所有组件名称
    target_nodes1=[]
    for one in nodes1:
        onee=one.get('name').split('.')
        if onee[-1] in ["in_false","out_false"]:
            name=onee[:-1]
            if name not in target_nodes1:
                target_nodes1.append(name)
    #print("target_nodes1=\n",target_nodes1)
    dic={}
    for one in target_nodes1:
        if(len(one)==1):
            dic[one[0]]=[]
            dic[one[0]].append(one)
    for one in target_nodes1:
        if(len(one)>1):
            dic[one[0]].append(one)
    
    #将列表转为字典
    fault_tree_dic={}
    key=""
    #================================
    #总的是target_nodes1，这里的例子是dic['T']
    #================================
    #print(target_nodes1)
    #print("\n")
    #print(dic['T'])
    fault_trees=list2dic(key,dic['T'])
    #输出为mermaid代码
    first=True
    output(fault_trees,first)
    
    final_fault_tree_dic={}
    for key,value in fault_tree_dic.items():
        final_fault_tree_dic[key]=value
    for key,value in fault_tree_dic.items():
        if len(value)>1:
            andGate=key+"_and{and}"
            final_fault_tree_dic[andGate]=[]
            for one in value:
                final_fault_tree_dic[andGate].append(one)
            final_fault_tree_dic[key]=[]
            final_fault_tree_dic[key].append(andGate)
            
    for key,value in final_fault_tree_dic.items():
        for one in value:
            print(key+" --> ",one)
    



