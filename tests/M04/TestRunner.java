import java.util.*;
public class TestRunner {
@SuppressWarnings("unchecked") static <K,V> Map<K,V> map(Object... entries) { Map<K,V> m = new LinkedHashMap<>(); for(int i=0;i<entries.length;i+=2)m.put((K)entries[i],(V)entries[i+1]);return m; }
static void check(String name,Object actual,Object expected){if(!Objects.deepEquals(actual,expected))throw new AssertionError(name+" mismatch");System.out.println(name+" passed on your local Java runtime");}
public static void main(String[] args) {
check("sample 1", Solution.solve(map("api",3,"login",5,"cart",3)), map("login",5,"api",3,"cart",3));
check("sample 2", Solution.solve(map()), map());
check("sample 3", Solution.solve(map("a",0,"b",-1)), map("a",0,"b",-1));
System.out.println("All sample assertions passed. Add edge and negative cases before concluding correctness.");
}
}