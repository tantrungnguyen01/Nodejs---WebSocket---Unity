#include <stdio.h>
#include <math.h>

void BaiTap4() {
	int chieuDaiCanh;
	int dienTichHinhVuong;

	printf("Moi ban nhap chieu dai canh hinh vuong: ");
	scanf_s("%d", &chieuDaiCanh);

	dienTichHinhVuong = chieuDaiCanh * chieuDaiCanh;

	printf("Dien tich hinh vuong la: %d", dienTichHinhVuong);
}

int main() {
    BaiTap4();
    return 0;
}