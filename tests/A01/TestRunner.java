import java.util.*;
public class TestRunner {
@SuppressWarnings("unchecked") static <K,V> Map<K,V> map(Object... entries) { Map<K,V> m = new LinkedHashMap<>(); for(int i=0;i<entries.length;i+=2)m.put((K)entries[i],(V)entries[i+1]);return m; }
static void check(String name,Object actual,Object expected){if(!Objects.deepEquals(actual,expected))throw new AssertionError(name+" mismatch");System.out.println(name+" passed on your local Java runtime");}
public static void main(String[] args) {
check("sample 1", Solution.solve(new int[]{10,20,30,40,50}), new int[]{50,40,30,20,10});
check("sample 2", Solution.solve(new int[]{}), new int[]{});
check("sample 3", Solution.solve(new int[]{7,7}), new int[]{7,7});
System.out.println("All sample assertions passed. Add edge and negative cases before concluding correctness.");
}
}