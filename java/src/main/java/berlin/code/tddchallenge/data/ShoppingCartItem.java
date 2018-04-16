package berlin.code.tddchallenge.data;

public class ShoppingCartItem {
    private String productId;
    private int quantity;

    public ShoppingCartItem() {

    }

    public ShoppingCartItem(String productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return String.format("ShoppingCartItem{productId='%s', quantity=%d}", productId, quantity);
    }
}
