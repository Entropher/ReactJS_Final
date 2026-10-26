import styles from "./profile.module.css";

export default async function ProfilePage() {
  let user = null;
  let hasError = false;

  try {
    const response = await fetch("https://fakestoreapi.com/users/3", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Profile request failed");
    }

    user = await response.json();
  } catch {
    hasError = true;
  }

  return (
    <main className={styles.page}>
      <section className={styles.profile} aria-labelledby="profile-title">
        <h1 id="profile-title">პროფილი</h1>
        {hasError ? (
          <p className={styles.error} role="alert">
            პროფილის ჩატვირთვა ვერ მოხერხდა. სცადეთ მოგვიანებით.
          </p>
        ) : (
          <>
            <div className={styles.identity}>
              <div className={styles.avatar} aria-hidden="true">
                {user.name.firstname[0].toUpperCase()}
                {user.name.lastname[0].toUpperCase()}
              </div>
              <div>
                <h2>
                  {user.name.firstname} {user.name.lastname}
                </h2>
                <p>@{user.username}</p>
              </div>
            </div>
            <dl className={styles.details}>
              <div>
                <dt>ელფოსტა</dt>
                <dd>{user.email}</dd>
              </div>
              <div>
                <dt>ტელეფონი</dt>
                <dd>{user.phone}</dd>
              </div>
              <div>
                <dt>მისამართი</dt>
                <dd>
                  {user.address.number} {user.address.street},{" "}
                  {user.address.city}
                </dd>
              </div>
            </dl>
          </>
        )}
      </section>
    </main>
  );
}
