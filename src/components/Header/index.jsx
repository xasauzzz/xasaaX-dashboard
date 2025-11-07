import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../../context";

import styles from "./Header.module.scss";

function Header() {
  const { userAccount, onConnect, isConnection } = useContext(AppContext);

  return (
    <header className="d-flex align-center">
      <div className={styles.logo}>
        <Link to="/">
          <img width={180} src="/img/raazzyx-logo.svg" alt="logo" />
        </Link>
      </div>
      <div className={styles.buttons}>
        <div className={styles.navButtons}>
          <NavLink to="/trade">
            {({ isActive, isPending }) => (
              <button
                className={
                  isActive ? styles.menuButtonActive : styles.menuButton
                }
              >
                Trade
              </button>
            )}
          </NavLink>
          <NavLink to="/finance">
            {({ isActive, isPending }) => (
              <button
                className={
                  isActive ? styles.menuButtonActive : styles.menuButton
                }
              >
                Finance
              </button>
            )}
          </NavLink>
          <NavLink to="/nft">
            {({ isActive, isPending }) => (
              <button
                className={
                  isActive ? styles.menuButtonActive : styles.menuButton
                }
              >
                NFT
              </button>
            )}
          </NavLink>
          <NavLink to="/support">
            {({ isActive, isPending }) => (
              <button
                className={
                  isActive ? styles.menuButtonActive : styles.menuButton
                }
              >
                Support
              </button>
            )}
          </NavLink>
        </div>
        <button
          onClick={onConnect}
          disabled={isConnection}
          className={styles.metaButton}
        >
          {userAccount ? (
            <span>{userAccount}</span>
          ) : (
            <>
              <p>Connect with</p>
              <img height={64} width={64} src="/img/fox.svg" alt="fox" />
            </>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
