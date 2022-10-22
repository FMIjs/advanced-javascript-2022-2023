#include <stdio.h>


class Cls {
    unsigned long int a, b;

    public:
   
    Cls() { }
    Cls(int _a, int _b) : a(_a), b(_b) { 

    } 

    // getters
    int geta() { return a; }
    int getb() { return b; }

    void method() {
        printf("%lu %lu \n", a, b);   // operates directly on the this pointer!
        printf("%lu \n", (unsigned long)this);     // &variable
    }

    virtual void print() {
         printf("printing from ClsA");
    };
};

class ClsB : public Cls { 
    int c;
    virtual void print() {
        printf("!!! printing from ClsB \n\n");
     };
};

// method resolution order
// DFS - depth first search

Cls variable(100, 200);
// Cls* rvar = &variable;       // 0xfe8e4800

void Cls_method(Cls& __this) {
    printf("%u %u \n", __this.geta(), __this.getb());
    printf("%lu \n", (unsigned long)(void*)&__this);        // &variable
}

// Cls_method2, Cls_method_3

int main() {
    variable.method();
    // auto vptr = Cls::method;
    // vptr(variable);
    Cls_method(variable);

    printf("%lu is the address of Cls_method", (unsigned long) &Cls_method);
    ClsB var;
    Cls* ptr = &var;
    ptr->print();
}

// ----- Cls instance
// 4 bytes -> int a
// 4 bytes -> int b 
// virtual table []
// ----- Cls2 instance
// 4 bytes -> int a 
// 4 bytes -> int b 
// 4 bytes -> int c
// virtual table []
// -----

