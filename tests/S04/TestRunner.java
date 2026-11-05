import java.util.*;
public class TestRunner {
@SuppressWarnings("unchecked") static <K,V> Map<K,V> map(Object... entries) { Map<K,V> m = new LinkedHashMap<>(); for(int i=0;i<entries.length;i+=2)m.put((K)entries[i],(V)entries[i+1]);return m; }
static void check(String name,Object actual,Object expected){if(!Objects.deepEquals(actual,expected))throw new AssertionError(name+" mismatch");System.out.println(name+" passed on your local Java runtime");}
public static void main(String[] args) {
check("sample 1", Solution.solve("automation"), map('a',2,'u',1,'t',2,'o',2,'m',1,'i',1,'n',1));
check("sample 2", Solution.solve("aab c"), map('a',2,'b',1,' ',1,'c',1));
check("sample 3", Solution.solve(""), map());
System.out.println("All sample assertions passed. Add edge and negative cases before concluding correctness.");
}
}