import java.util.*;
public class TestRunner {
@SuppressWarnings("unchecked") static <K,V> Map<K,V> map(Object... entries) { Map<K,V> m = new LinkedHashMap<>(); for(int i=0;i<entries.length;i+=2)m.put((K)entries[i],(V)entries[i+1]);return m; }
static void check(String name,Object actual,Object expected){if(!Objects.deepEquals(actual,expected))throw new AssertionError(name+" mismatch");System.out.println(name+" passed on your local Java runtime");}
public static void main(String[] args) {
check("sample 1", Solution.solve(7), Arrays.asList(0L,1L,1L,2L,3L,5L,8L));
check("sample 2", Solution.solve(0), Arrays.asList());
check("sample 3", Solution.solve(1), Arrays.asList(0L));
System.out.println("All sample assertions passed. Add edge and negative cases before concluding correctness.");
}
}