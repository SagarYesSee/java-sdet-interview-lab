import java.util.*;
public class TestRunner {
@SuppressWarnings("unchecked") static <K,V> Map<K,V> map(Object... entries) { Map<K,V> m = new LinkedHashMap<>(); for(int i=0;i<entries.length;i+=2)m.put((K)entries[i],(V)entries[i+1]);return m; }
static void check(String name,Object actual,Object expected){if(!Objects.deepEquals(actual,expected))throw new AssertionError(name+" mismatch");System.out.println(name+" passed on your local Java runtime");}
public static void main(String[] args) {
check("sample 1", Solution.solve(new int[]{200,500,200,404,500}), map(200,2,404,1,500,2));
check("sample 2", Solution.solve(new int[]{}), map());
check("sample 3", Solution.solve(new int[]{201,204}), map(201,1,204,1));
System.out.println("All sample assertions passed. Add edge and negative cases before concluding correctness.");
}
}