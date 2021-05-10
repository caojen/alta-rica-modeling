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


import sys

if __name__ == "__main__":  
      
    #1. 读取xml文件
    print(sys.argv)
    filename = sys.argv[1]   # receive filename from args
    print(filename)
    tree = read_xml(filename)
    #A. 找到父节点  
    nodes1 = find_nodes(tree, "define-block/assertion/assignment") 
    #print(len(nodes1))
    target_nodes1=[]
    for nodes in nodes1:
        node=find_nodes(nodes, "variable")
        nodee=find_nodes(nodes, "and/variable") 
        for one in nodee:
            node.append(one)#node是当前assignment里的所有variable
        flag = True
        
        vlist = []
        for v in node:
            key = v.get('name').split('.')[0]
            if key in vlist:
                flag=False
                break
            else:
                vlist.append(key)
            dotlen=len(v.get('name').split('.'))
            if dotlen==2:
                if v.get('name').split('.')[1]!='in' and v.get('name').split('.')[1]!='out':
                    flag=False
                    break
            elif dotlen>2:
                flag=False
                break
        if flag==True:
            target_nodes1.append(nodes)
            ############
            CompName=[]
            for a in node:
                CompName.append(a.get("name").split('.')[0])
                #print(a.get("name"))
            #print(CompName)
            for n in range(len(CompName)-1):
                print(CompName[n+1]+" --> "+CompName[0])
            #print("----------------------\n")
    #print(len(target_nodes1))
    




