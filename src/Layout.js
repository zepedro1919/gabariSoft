import React from 'react';
import './Layout.css';

const Layout = () => {
    const zoneGroups = [
        { color: 'red', zones: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3'] },
        { color: 'orange', zones: ['E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'H1', 'H2', 'H3'] },
        { color: 'yellow', zones: ['I1', 'I2', 'I3', 'J1', 'J2', 'J3', 'K1', 'K2', 'K3'] },
        { color: 'green', zones: ['L1', 'L2', 'L3', 'M1', 'M2', 'M3'] },
        { color: 'blue', zones: ['N1', 'N2', 'N3', 'O1', 'O2', 'O3', 'P1', 'P2', 'P3'] },
        { color: 'purple', zones: ['Q1', 'Q2', 'Q3', 'R1', 'R2', 'R3', 'S1', 'S2', 'S3'] },
        { color: 'pink', zones: ['T1', 'T2', 'T3', 'U1', 'U2', 'U3', 'V1', 'V2', 'V3'] },
      ];

  return (
    <div className="layout-container">
      {zoneGroups.map((group, index) => (
        <div key={index} className="zone-group">
            {group.zones.map((zone) => (
                <div
                key={zone}
                className="zona"
                style={{ backgroundColor: group.color }}
                >
                {zone}
                </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Layout;
