## 数据结构：  
### 1、数组
  数组是一种线性表数据结构，他用一组连续的内存空间，来存储一组具有相同类型的数据

- 线性表：数据就像一条线一样的接口，最多只有前后两个方向。除了数组，链表、队列、栈等也是线性表结构；非线性表比如二叉树、堆、图等，数据之间不是简单的前后关系
- 连续的内存空间和相同类型的数据：这两个特性让数组可以随机访问，但也让数组很多操作变得非常低效，比如删除和插入一个数据，为了保证连续性，就需要做大量的数据搬移工作

### 2、链表
单链表、双链表、循环链表、双循环链表
涉及知识：逆转链表、检测环、查找倒数第几个值
典型思想（双指针）

### 3、栈 
浏览器，先进后出

### 4、队列
线程池，先进西拿出

### 5、跳表
相当于链表的索引构建，Redis的有序集合是通过字典和跳表实现的
列表的二分查找（当然可以建立多级结构，2可以，3也可以，，，）

注：有时间去把具体的跳表实现了

### 6、散列表（哈希表|hash table）
word文档中的单词拼写检查功能  
运动会编号例子  
散列函数设计的基本要求：
- 1、散列表计算得到的值是一个非负整数
- 2、如果key1=key2， 那hash(key1) == hash(key2);
- 3、如果 key1!=key2， 那hash(key1) != hash(key2);  
 
针对上述第三点：
但是在真实的情况下，要想找到一个不同的 key ；

### 二叉树
树：非线性表结构
树有三个比较相似的概念：高度（height）、深度(depth)、层（level）  
节点的高度=节点到叶子结点的最长路径  
节点的深度=根节点到这个节点所经历的边的个数  
节点的层数=节点的深度+1  
树的高度=根节点的高度

#### 几个特殊二叉树的概念：
1、除了叶子节点外，每个节点都有左右两个子节点，这种二叉树就叫做满二叉树  
2、叶子结点都在最底下两层，最后一层的子节点都靠左排列，并且除了最后一层，其它层的节点个数都要达到最大，这种二叉树叫做完全二叉树  （借助数组的存储方式，可以理解完全二叉树的意义）

二叉树存储方式，可以用链式存储法（大部分二叉树代码都是通过这种结构来实现的），也可以是顺序存储法（如果是完全二叉树，则这种方法是最节省内存的一种方式，因为即使是链式存储，也要存储左右子节点的指针）
备注：后续到堆和堆排序的时候，堆其实就是一种完全二叉树，最常用的存储方式就是数组

#### 二叉树的遍历
- 前序遍历： 先打印这个节点，再打印左子树，最后打印右子树
- 中序遍历：先打印左子树，再打印本身，最后打印右子树
- 后序遍历：先打印左子树，在打印右子树，最后打印本身
其实，这里的遍历方式，就是一个递归过程
备注：如果想对二叉树进行层序遍历，其实可以借助队列进行层序遍历

#### 二叉查找树
二叉树查找树是为了快速查找而生的，（思考：既然有了很高效的散列表，为啥还需要二叉树来做呢？）  
不仅支持快速查找一个数据，还支持快速插入、删除一个数据  

二叉查找树的特殊要求：在树中的任意一个节点，其左子树中的每个节点的值，都要小于这个节点的值，而右子树节点的值都大于这个节点的值
##### 二叉查找树的查询操作
```javascript

public class BinarySearchTree {
  private Node tree;

  public Node find(int data) {
    Node p = tree;
    while (p != null) {
      if (data < p.data) p = p.left;
      else if (data > p.data) p = p.right;
      else return p;
    }
    return null;
  }

  public static class Node {
    private int data;
    private Node left;
    private Node right;

    public Node(int data) {
      this.data = data;
    }
  }
}
```
就是简单的，和当前节点判断大小

##### 二叉查找树的插入操作
```javascript

public void insert(int data) {
  if (tree == null) {
    tree = new Node(data);
    return;
  }

  Node p = tree;
  while (p != null) {
    if (data > p.data) {
      if (p.right == null) {
        p.right = new Node(data);
        return;
      }
      p = p.right;
    } else { // data < p.data
      if (p.left == null) {
        p.left = new Node(data);
        return;
      }
      p = p.left;
    }
  }
}
```
规则就是大于就往右插（有节点为空），小于就往左插（左节点为空）

##### 二叉树的删除操作
删除操作要分三种情况处理

- 如果要删除的节点没有子节点，直接删除
- 如果只有一个子节点，只需要更新父节点中，指向删除节点的指针，让他指向删除节点就可以了
- 当要删除的节点有两个子节点，则在右子树中找到自小节点，将这个节点替换到删除节点上，然后删除掉这个最小节点，这个节点肯定没有左子节点，否则他就不是最小节点了

```javascript

public void delete(int data) {
  Node p = tree; // p指向要删除的节点，初始化指向根节点
  Node pp = null; // pp记录的是p的父节点
  while (p != null && p.data != data) {
    pp = p;
    if (data > p.data) p = p.right;
    else p = p.left;
  }
  if (p == null) return; // 没有找到

  // 要删除的节点有两个子节点
  if (p.left != null && p.right != null) { // 查找右子树中最小节点
    Node minP = p.right;
    Node minPP = p; // minPP表示minP的父节点
    while (minP.left != null) {
      minPP = minP;
      minP = minP.left;
    }
    p.data = minP.data; // 将minP的数据替换到p中
    p = minP; // 下面就变成了删除minP了
    pp = minPP;
  }

  // 删除节点是叶子节点或者仅有一个子节点
  Node child; // p的子节点
  if (p.left != null) child = p.left;
  else if (p.right != null) child = p.right;
  else child = null;

  if (pp == null) tree = child; // 删除的是根节点
  else if (pp.left == p) pp.left = child;
  else pp.right = child;
}
```

二叉树还支持快速地查找最大节点和最小节点、前驱结点、后继节点

注意：重要特性，中序遍历二叉树，可以得到输出有序的数据序列，因此二叉查找树也叫做二叉排序树

平衡二叉查找树优于散列表地几点考虑：
- 1、散列表中是无序的，二叉查找树只需要中序遍历就可以在O(n)的时间复杂度内，输出有序的数据序列
- 2、散列表扩容耗时很多，而且当遇到散列冲突时，性能不稳定
- 3、尽管散列表地查找操作的时间复杂度时常量级的，但是因为哈希冲突的存在，这和常量不一定比logn快，加上哈希函数的耗时，也不一定比平衡二叉树的效率高
- 4、散列表的构造比二叉查找树复杂，要考虑的东西也很多，而二叉树只需要考虑平衡性这一个问题

递归树，分析时间算法的复杂度