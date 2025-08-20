const company = {
    name: "TechCorp",
    address: {
        city: "Delhi",
        pin: "110001"
    }
};

function getCompanyName() {
    return company.name;
}

exports.company = company;
exports.getCompanyName = getCompanyName;
