package co.za.dubby.server.inventory.model.util;

public enum CompanyTypeDescription {
    
    SOLE_PROPRIETOR("Sole Proprietor", "Sole Proprietor"),
    PARTNERSHIP("Partnership", "Partnership"),
    CLOSE_CORPORATION("CC", "Close Corporation"),
    PRIVATE_COMPANY("(Pty) Ltd", "Private Company"),
    PERSONAL_LIABILITY_COMPANY("Inc", "Personal Liability Company"),
    PUBLIC_COMPANY("Ltd", "Public Company"),
    STATE_OWNED_COMPANY("SOC Ltd", "State Owned Company"),
    NON_PROFIT_COMPANY("NPC", "Non-Profit Company"),
    CO_OPERATIVES("Co-operative Limited", "Co-operative");
    
    private final String type;
    private final String typeDescription;

    private CompanyTypeDescription(String type, String typeDescription) {
        this.type = type;
        this.typeDescription = typeDescription;
    }

    public String getType() {
        return type;
    }

    public String getTypeDescription() {
        return typeDescription;
    }
}
