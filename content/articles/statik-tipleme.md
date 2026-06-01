---
title: Statik Tipleme Bana Neden Güven Veriyor?
description: Statik ve dinamik tipleme tartışmasına Python ve Rust üzerinden kişisel bir bakış.
date: 2026-06-01
---

Yazılımı seviyorum... 2019'dan beri kod yazıyorum ve bunu eğlenerek yapıyorum çünkü bana tamamen özgür bir ortam sunuyor. Bir şeyi yapmanın tek bir yolu yok; senin yazdığın kodu, seninle tamamen aynı şekilde yazacak ikinci bir kişi bulmak neredeyse imkansız. Sürekli olarak en yeni teknolojileri takip etmekten, bu bitmek bilmeyen öğrenme sürecinden büyük keyif alıyorum.

Programlama dünyasının en uzun soluklu ve hararetli tartışmalarından biri de statik ve dinamik tipleme arasındadır. Kesinlikle iki taraftan da çok fazla argüman gördüm ama bunların çok azı gerçekten mantıklı ve ikna ediciydi. Çoğu zaman mantık kılığına girmiş, sadece kendini haklı çıkarma çabası olan bir sürü laf kalabalığı sunuluyor.

**Bugün tam olarak buna değinmek istiyorum.** Bu konuyu sadece soyut bir inanç tartışması olmaktan çıkarıp, neden statik tiplemenin bana o aradığım güvenliği sağladığını kodun kendisiyle göstermek istiyorum.

Elbette taraf değiştiren insanlar yok değil. Hayatı boyunca dinamik dillerin o kural tanımaz rahatlığında yüzüp, aniden sıkı tip denetimlerinin savunucusu olanlara hepimiz şahit olmuşuzdur. Hani derler ya; inanç ne kadar yeniyse, alevi o kadar parlak olur.

Fakat benim statik tiplere olan bağım geçici bir heves değil. Evet, sözdizimi bazen göz korkutucu derecede karmaşık olabilir; derleyiciyle adeta bir satranç maçı yapmanız gerekebilir. Ama günün sonunda, o katı kurallar size eşsiz bir güvenlik ağı sunar. Ne demek istediğimi, dinamik dünyanın popüler çocuğu Python ile statik dünyanın zırhlı şövalyesi Rust üzerinden göstereyim.

Dinamik bir dilde, mesela **Python**'da bir veriyi işlerken inanılmaz bir serbestlik vardır:

```python
def kullanici_karsila(kullanici):
    # Python burada 'kullanici'nın ne olduğunu baştan bilmez.
    # Bir sözlük (dictionary) mü, özel bir nesne mi, yoksa sadece basit bir metin mi?
    # Sadece kodun o satırı çalıştırıldığında öğreniriz.
    return kullanici.get("isim") + " sisteme giriş yaptı!"

# Geliştirme aşamasında her şey harika ve hızlı görünür.
# Ancak yanlış bir veri tipi gönderirseniz...
# kullanici_karsila("Ahmet") # GÜM! Çalışma zamanında (runtime) hata!
```

İşte benim tarzıma uymayan kısım tam olarak bu *"çalıştığında görürüz"* mantığı. Karmaşık bir sistemde kontrolün yavaş yavaş elinizden kayıp gitmesi ihtimali, o belirsizlik hissi beni rahatsız ediyor.

Bunun karşısına **Rust** gibi, bellek yönetimini (memory management) merkeze alan, her şeyin sınırlarını baştan çizdiğiniz statik bir yapıyı koyalım:

```rust
// Verinin ne olduğu ve sınırları kesin olarak belli.
struct Kullanici {
    isim: String,
    aktif_mi: bool,
}

// Uygulama (impl) bloklarıyla bu verinin yapabileceği eylemleri
// ve sahiplik (ownership) kurallarını sıkı sıkıya tanımlıyoruz.
impl Kullanici {
    fn karsila(&self) -> String {
        format!("{} sisteme giriş yaptı!", self.isim)
    }
}

fn main() {
    let user = Kullanici {
        isim: String::from("Ahmet"),
        aktif_mi: true,
    };

    // Eğer fonksiyona yanlış bir tip gönderirsek, kod derlenmez bile.
    // Çalışma zamanında patlayan sürprizler yok, bellek sızıntısı (memory leak) yok.
    println!("{}", user.karsila());
}
```

Ben değişkenlerimi sıkı sıkıya tanımlamayı, derleyicinin beni denetlemesini, bellek sızıntılarından uzak, zırh gibi sağlam sistemler yazabilmeyi seviyorum. Rust örneğindeki gibi veri yapılarını ve onların yeteneklerini baştan kurgulamak, yazdığım kodun ileride başıma iş açmasını daha en başından engelliyor.

Geçmişte ben de statik tiplemenin yazılımdaki "tek doğru yol" olduğuna inananlardandım. Fakat zamanla şunu fark ettim: Yazılımı bu kadar büyüleyici yapan şey, en başta beni bu dünyaya çeken o özgürlük ve çeşitlilik hissinin ta kendisi. Hepimiz aynı kurallara ve mimari yaklaşımlara mahkum olsaydık, yaratıcılığımızı sergilediğimiz bu tuval sıkıcı bir fabrikaya dönüşürdü.

Bir başkası kodunu esnek bir dille, sınırları dert etmeden, bir akış içinde yazmayı sevebilir. Ve günün sonunda ikimiz de ortaya muazzam uygulamalar çıkarabiliriz. Ben güvenli, öngörülebilir ve hatalardan arındırılmış o statik dünyamda mutluyum; başkaları da dinamik dünyanın esnekliğinde üretmeye devam etsin. Ne de olsa, yazılım ekosistemini ayakta tutan şey herkesin kendi benzersiz yolunu çizebilmesidir.
